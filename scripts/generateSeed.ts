// scripts/generateSeed.ts
import { faker } from "@faker-js/faker"
import fs from "node:fs"

const topics = [
  "Politik",
  "Wirtschaft",
  "Feuilleton",
  "Sport",
  "Wissenschaft",
  "Meinung",
  "International",
  "Zürich",
]

function randomTopics() {
  return faker.helpers.arrayElements(topics, { min: 1, max: 3 })
}

function createArticle(id: number) {
  const title = faker.lorem.sentence(6)
  const lead = faker.lorem.sentences(2)
  const body = Array.from({ length: 4 }, () =>
    faker.lorem.paragraph()
  ).join("\n\n")

  return {
    id: String(id),
    title,
    lead,
    body,
    author: faker.person.fullName(),
    publishedAt: faker.date.recent({ days: 30 }).toISOString(),
    topics: randomTopics().map((t) => ({
      id: t.toLowerCase(),
      name: t,
    })),
    premium: faker.datatype.boolean(0.3),
    imageUrl: `https://picsum.photos/seed/${id}/690/220.webp`,
  }
}

const articles = Array.from({ length: 60 }, (_, i) =>
  createArticle(i + 1)
)

fs.writeFileSync(
  "./src/api/seed.ts",
  `export const ARTICLES = ${JSON.stringify(articles, null, 2)}`
)

console.log("Seed generated ✔")