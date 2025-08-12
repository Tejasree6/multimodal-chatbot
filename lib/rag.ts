// lib/rag.ts
const documents = [
  {
    id: 'doc1',
    content: "The company's last quarter revenue was $15 million, driven by strong growth in the European market. Our new product, 'QuantumSync,' is expected to launch in Q3.",
  },
  {
    id: 'doc2',
    content: "Our CEO, Jane Doe, announced a new initiative to focus on sustainable energy. The company is hiring for roles in engineering and marketing to support this new direction.",
  },
  {
    id: 'doc3',
    content: "Quantum computing is a field of physics that leverages the principles of quantum mechanics to perform computations. Unlike classical computers, which use bits that can be either 0 or 1, quantum computers use qubits, which can be 0, 1, or both simultaneously (a state known as superposition).",
  },
];

export async function getRelevantContext(query: string): Promise<string> {
  // A simple keyword-based search for demonstration.
  // In a real application, this would be a vector search.
  const relevantDocs = documents.filter(doc =>
    doc.content.toLowerCase().includes(query.toLowerCase())
  );

  if (relevantDocs.length > 0) {
    // Join the relevant document content to use as context
    return relevantDocs.map(doc => doc.content).join('\n\n');
  }

  return '';
}