import { z } from "zod"

export const needs = ["website", "eshop", "mobile", "automation", "unsure"] as const

export const briefSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(""),
  needs: z.array(z.enum(needs)).max(needs.length).default([]),
  message: z.string().trim().min(1).max(5000),
  email: z.email().max(254),
})

export type Brief = z.infer<typeof briefSchema>
export type BriefField = "name" | "email" | "message"
export type BriefValues = { name: string; company: string; message: string; email: string }

export type BriefState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error"
      fields: BriefField[]
      sendFailed: boolean
      values: BriefValues
    }
