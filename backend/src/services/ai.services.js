const { GoogleGenAI } = require("@google/genai");
const { z, json } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

function parseModelJsonResponse(text) {
  try {
    const trimmedText = (text || "").trim();
    const fencedJsonMatch = trimmedText.match(
      /^```(?:json)?\s*([\s\S]*?)\s*```$/i,
    );
    const candidateText = fencedJsonMatch
      ? fencedJsonMatch[1].trim()
      : trimmedText;

    try {
      return JSON.parse(candidateText);
    } catch (error) {
      const startIndex = candidateText.indexOf("{");
      const endIndex = candidateText.lastIndexOf("}");

      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        return JSON.parse(candidateText.slice(startIndex, endIndex + 1));
      }

      throw error;
    }
  } catch (error) {
    console.error("AI Response JSON Parsing Failed:", error.message);
    throw new Error("Invalid format returned from AI model");
  }
}

function normalizeInterviewReportPayload(report) {
  const preparationPlanSource =
    report?.preparationPlan?.plan ?? report?.preparationPlan;

  return {
    ...report,
    preparationPlan: Array.isArray(preparationPlanSource)
      ? preparationPlanSource.map((item) => ({
          day: item.day,
          focus: item.focus,
          task: Array.isArray(item.tasks)
            ? item.tasks
            : Array.isArray(item.task)
              ? item.task
              : [],
        }))
      : [],
  };
}

const textSchemaReference = `["OBJECT STRUCTURE & DATA REQUIREMENTS:
{
  'title': String. The exact job title used for this specific analysis.
  'matchScore': Number (0-100). Represents the percentage of alignment between the candidate's profile and the job description.
  'technicalQuestions': Array of Objects. Each object must contain:
      - 'question': String. A specific technical query relevant to the role.
      - 'intention': String. The specific technical skill or logic the interviewer is testing.
      - 'answer': String. A comprehensive guide on how to answer, including key technical points and the ideal problem-solving approach.
  'behavioralQuestions': Array of Objects. Each object must contain:
      - 'question': String. A situational or soft-skill question (e.g., conflict resolution).
      - 'intention': String. The trait the interviewer is looking for (e.g., leadership, teamwork).
      - 'answer': String. Key points the candidate should cover to demonstrate the required trait effectively.
  'skillGaps': Array of Objects. Each object must contain:
      - 'skill': String. A specific competency required by the job that is missing or weak in the resume.
      - 'level': Number (0-100). Represents the current proficiency level of the skill. 100 indicates full proficiency, 0 indicates a critical lack.
      - 'severity': String Enum ['low', 'medium', 'high']. Indicates how critical this gap is to performing the job successfully. MUST strictly correspond to 'level': 'high' if level <= 40, 'medium' if level > 40 and < 80, 'low' if level >= 80.
  "preparationPlan": {
    "type": "Array of Objects",
    "requirements": [
      "The plan MUST span a minimum of 7 days. If the candidate's skill gaps are significant, extend the plan up to 30 days.",
      "Days should be sequential, starting at 1."
    ],
    "objectStructure": {
      "day": "Number. The sequential day of the plan. Ensure the distribution of topics allows for deep learning of complex subjects over multiple days if necessary.",
      "focus": "String. The thematic pillar for the day (e.g., 'Day 1-3: Low-Level Design Patterns', 'Day 4-7: Distributed Systems & Scalability').",
      "tasks": "Array of Strings. 3-5 high-impact, actionable tasks per day. These must include specific concepts to study, coding challenges to solve, or mock interview scenarios to practice."
    }
  },
}"]`;

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
        INSTRUCTION: Act as a Senior Technical Recruiter. Analyze the provided candidate data against the Job Description.
        
        DATA:
        - Resume: ${resume}
        - Self Description: ${selfDescription}
        - Job Description: ${jobDescription}

        OUTPUT REQUIREMENT:
        Return ONLY a valid JSON object. Do not include any introductory text, markdown bolding, or conversational filler. 
        Follow this schema reference strictly:
        ${textSchemaReference}
    `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });
  console.log(response.text);
  return normalizeInterviewReportPayload(parseModelJsonResponse(response.text));
}

module.exports = {
  generateInterviewReport,
};
