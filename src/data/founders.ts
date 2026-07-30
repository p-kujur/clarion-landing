export interface Founder {
  name: string;
  title: string;
  summary: string[];
  linkedin?: string;
  image?: string;
}

export const founders: Founder[] = [
  {
    name: "Mr. Manoj Prabhakar",
    title: "Director",
    linkedin: "https://www.linkedin.com/in/manoj-prabhakar-a76b831b2/",
    summary: [
      "Mr. Manoj Prabhakar is the visionary Director of Clarion Education and Skill Pvt. Ltd., bringing over 20 years of leadership experience across the corporate and development sectors. A Science graduate with a Master's in Rural Management from the Institute of Rural Management, Anand (IRMA), he combines strategic thinking with extensive experience in institution building, innovation, and large-scale programme implementation. Prior to founding Clarion, he served as a State Head with Amul, where he led diverse teams and managed complex operations across India and Nepal.",
      "At Clarion, he leads the organisation's vision of transforming knowledge acquisition through technology-enabled learning, innovative pedagogy, and institutional strengthening. Recognising the rapidly evolving knowledge ecosystem, he champions learner-centric solutions that integrate smart classrooms, digital learning platforms, language and science laboratories, teacher capacity building, and experiential learning. His leadership is focused on preparing schools and learners for the opportunities emerging from digital education, artificial intelligence, competency-based learning, and the National Education Policy (NEP) 2020. Under his guidance, Clarion strives to create inclusive, future-ready learning ecosystems that equip learners with the knowledge, skills, confidence, and adaptability required in a technology-driven world. This vision is aligned with Clarion's mission of building intelligent, innovation-driven learning environments through integrated educational solutions."
    ]
  },
  {
    name: "Mrs. Sneha Kumari",
    title: "Director",
    summary: [
      "Ms. Sneha Kumari is the Director of Clarion Education and Skill Pvt. Ltd. and an Economics graduate with a deep commitment to advancing equitable, inclusive, and innovation-driven learning. Guided by the belief that quality learning is the foundation of sustainable social development, she is passionate about reimagining learning systems that empower every learner to realise their full potential.",
      "She plays a pivotal role in shaping Clarion's learning vision by promoting learner-centric pedagogies, inclusive learning practices, and technology-enabled teaching-learning models. Her work focuses on creating learning environments that foster curiosity, creativity, critical thinking, and lifelong learning while ensuring that children from diverse socio-economic backgrounds have access to meaningful learning opportunities. With a strong emphasis on learning innovation and institutional transformation, she contributes to the development of scalable solutions that integrate smart classrooms, digital content, language learning, teacher development, and experiential education. Her vision is to build resilient education systems capable of addressing emerging learning needs and preparing students to thrive in an increasingly interconnected and knowledge-driven global economy. This approach reflects Clarion's philosophy of creating future-ready schools through innovation, technology, and inclusive learning."
    ]
  }
];
