import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import User from '../models/User.js'
import JobPost from '../models/JobPost.js'
import Application from '../models/Application.js'

const sourceDirectory = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(sourceDirectory, '../../../.env') })

const jobSeeds = [
  {
    title: 'Senior Full Stack Engineer',
    description: 'We are looking for a Senior Full Stack Engineer experienced with React, Node.js, and MongoDB. You will lead design and development of our primary recruitment workflow engine.',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'full-time',
    salary: { min: 120000, max: 160000 },
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'System Architecture'],
    experienceLevel: '5+ years',
    openings: 2,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'open',
  },
  {
    title: 'Product Manager',
    description: 'Help define the product roadmap and translate user insights into clear technical requirements. You will work closely with engineering, design, and operations teams.',
    department: 'Product',
    location: 'San Francisco, CA',
    employmentType: 'full-time',
    salary: { min: 110000, max: 145000 },
    skillsRequired: ['Product Roadmap', 'Agile', 'Jira', 'UI/UX Design', 'SQL'],
    experienceLevel: '3+ years',
    openings: 1,
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    status: 'open',
  },
  {
    title: 'Data Analyst Intern',
    description: 'Learn how to process and visualize data dashboards for core business metrics. Under guidance, you will draft SQL queries and configure dashboards.',
    department: 'Analytics',
    location: 'Hybrid',
    employmentType: 'internship',
    salary: { min: 45000, max: 60000 },
    skillsRequired: ['Python', 'SQL', 'Tableau', 'Excel', 'Statistics'],
    experienceLevel: 'Entry Level',
    openings: 3,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'open',
  },
  {
    title: 'Lead UI/UX Designer',
    description: 'Lead visual design efforts across multiple product lines. Create wireframes, interactive prototypes, and establish global brand guidelines.',
    department: 'Design',
    location: 'Remote',
    employmentType: 'full-time',
    salary: { min: 105000, max: 135000 },
    skillsRequired: ['Figma', 'Prototyping', 'Wireframing', 'User Research', 'Design Systems'],
    experienceLevel: '4+ years',
    openings: 1,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    status: 'open',
  },
  {
    title: 'Sales Development Representative',
    description: 'Draft outreach templates, search lead directories, and configure outbound sales automation. This position is a perfect match for driven sales beginners.',
    department: 'Sales',
    location: 'Chicago, IL',
    employmentType: 'contract',
    salary: { min: 60000, max: 80000 },
    skillsRequired: ['Cold Outreach', 'HubSpot', 'Communication', 'Negotiation', 'Salesforce'],
    experienceLevel: '1+ years',
    openings: 2,
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'closed',
  },
  {
    title: 'DevOps Engineer',
    description: 'Manage AWS infrastructure, maintain CI/CD pipelines, and secure cloud environments. Draft infrastructure as code templates using Terraform.',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'full-time',
    salary: { min: 130000, max: 170000 },
    skillsRequired: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'CI/CD'],
    experienceLevel: '4+ years',
    openings: 1,
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'draft',
  },
]

const applicantSeeds = [
  { name: 'John Doe', email: 'john.doe@example.com', phone: '555-0101', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-0102', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-0103', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Bob Brown', email: 'bob.brown@example.com', phone: '555-0104', password: 'Password123!', role: 'applicant', isActive: false },
  { name: 'Charlie Davis', email: 'charlie.d@example.com', phone: '555-0105', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Eva Elkhart', email: 'eva.e@example.com', phone: '555-0106', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Frank Miller', email: 'frank.m@example.com', phone: '555-0107', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Grace Hopper', email: 'grace.h@example.com', phone: '555-0108', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Henry Lovelace', email: 'henry.l@example.com', phone: '555-0109', password: 'Password123!', role: 'applicant', isActive: true },
  { name: 'Ivy Green', email: 'ivy.green@example.com', phone: '555-0110', password: 'Password123!', role: 'applicant', isActive: true },
]

async function seed() {
  try {
    console.log('Connecting to database...')
    await connectDatabase()

    console.log('Cleaning existing data (preserving admin users)...')
    await Application.deleteMany({})
    await JobPost.deleteMany({})

    let adminUsers = await User.find({ role: 'admin' })
    console.log(`Found ${adminUsers.length} existing admin accounts.`)

    if (adminUsers.length === 0) {
      console.log('No admin users found. Seeding a default admin user...')
      const defaultAdmin = new User({
        name: 'Admin User',
        email: 'admin@hireflow.com',
        phone: '555-9999',
        password: 'Password123!',
        role: 'admin',
        isActive: true,
      })
      await defaultAdmin.save()
      adminUsers = [defaultAdmin]
    }

    await User.deleteMany({ role: { $ne: 'admin' } })

    console.log('Seeding Job Posts...')
    const jobs = await JobPost.insertMany(jobSeeds)
    console.log(`Successfully seeded ${jobs.length} job posts.`)

    console.log('Seeding Candidate Users...')
    const applicants = []
    for (const applicantData of applicantSeeds) {
      const applicant = new User(applicantData)
      await applicant.save()
      applicants.push(applicant)
    }
    console.log(`Successfully seeded ${applicants.length} candidates.`)

    console.log('Seeding Applications and status logs...')
    const sampleCoverLetters = [
      "I am highly excited to apply for this vacancy. My skills perfectly match your job description, and I would love to join your growth-focused product team.",
      "Attached is my resume listing my background. I look forward to your review and discussion of this opportunity.",
      "Recruitment team, I am eager to apply for this opening. I bring strong skills, a positive attitude, and three years of relevant industry projects.",
      "Dear hiring manager, please consider my candidacy for this post. I am an enthusiastic developer who thrives on challenging engineering goals."
    ]

    const applicationSeeds = [
      { applicantIdx: 0, jobIdx: 0, status: 'shortlisted', adminNotes: 'Strong frontend background, schedule interview.' },
      { applicantIdx: 1, jobIdx: 0, status: 'interview', adminNotes: 'Completed coding screen, excellent technical score.' },
      { applicantIdx: 2, jobIdx: 0, status: 'hired', adminNotes: 'Offer accepted, onboarding set for next month.' },
      { applicantIdx: 4, jobIdx: 0, status: 'pending', adminNotes: '' },
      { applicantIdx: 5, jobIdx: 0, status: 'rejected', adminNotes: 'Insufficient experience in back-end technologies.' },

      { applicantIdx: 1, jobIdx: 1, status: 'pending', adminNotes: '' },
      { applicantIdx: 6, jobIdx: 1, status: 'shortlisted', adminNotes: 'Figma prototypes are stellar.' },
      { applicantIdx: 7, jobIdx: 1, status: 'interview', adminNotes: 'Scheduled panel discussion on Product roadmap.' },

      { applicantIdx: 2, jobIdx: 2, status: 'pending', adminNotes: '' },
      { applicantIdx: 8, jobIdx: 2, status: 'hired', adminNotes: 'Very enthusiastic, ready to start.' },
      { applicantIdx: 9, jobIdx: 2, status: 'rejected', adminNotes: 'GPA requirements did not meet internship threshold.' },

      { applicantIdx: 0, jobIdx: 3, status: 'pending', adminNotes: '' },
      { applicantIdx: 3, jobIdx: 3, status: 'pending', adminNotes: 'Review block status first.' },
      { applicantIdx: 5, jobIdx: 3, status: 'shortlisted', adminNotes: 'Excellent portfolio designs.' },

      { applicantIdx: 7, jobIdx: 4, status: 'rejected', adminNotes: 'Position closed prior to final interview rounds.' },
    ]

    for (const appSeed of applicationSeeds) {
      const applicant = applicants[appSeed.applicantIdx]
      const job = jobs[appSeed.jobIdx]

      const statusHistory = []
      statusHistory.push({
        status: 'pending',
        changedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      })

      if (appSeed.status !== 'pending') {
        statusHistory.push({
          status: appSeed.status,
          changedAt: new Date(),
        })
      }

      const application = new Application({
        applicant: applicant._id,
        jobPost: job._id,
        status: appSeed.status,
        resumeUrl: 'https://hireflow-resumes.s3.amazonaws.com/mock-resume-url.pdf',
        coverLetter: sampleCoverLetters[appSeed.applicantIdx % sampleCoverLetters.length],
        adminNotes: appSeed.adminNotes,
        statusHistory,
      })

      await application.save()
    }
    console.log(`Successfully seeded ${applicationSeeds.length} applications.`)

    console.log('Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
}

seed()
