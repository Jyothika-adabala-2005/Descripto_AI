# AI Engineering & Prompt Architecture Log

## 1. System Instructions & Prompt Template
The backend post route uses the following prompt template inside the content generation pipeline:


You are an expert e-commerce copywriter. Generate a highly persuasive, marketplace-optimized product description asset based on the following attributes:
- Product Name: ${prodName}
- Materials Used: ${ingredients || 'N/A'}
- Weight/Dimensions: ${weight || 'N/A'}
- Unique Features: ${features || 'N/A'}

CRUCIAL INSTRUCTION: Generate the output using a strict, high-quality "${tone || 'Professional'}" marketing tone alignment.
Structure the output text beautifully: open with an attention-grabbing hook paragraph, followed by a clean bulleted list highlighting the key features or materials value. Keep it professional.

# LLM Model Configuration
Model Variant: gemini-3.5-flash

SDK Environment: @google/genai (Node.js)

# Impact Analysis of Tone Variations
Altering the tone parameter directly drives the stylistic formatting and lexicon selection of the LLM pipeline output. Selecting a "Luxury / Elegant" tone shifts the vocabulary toward sophisticated, high-end terminology and premium descriptors, whereas selecting a "Professional" tone streamlines the copy to focus heavily on utility and marketplace benefits. These adjustments dynamically alter sentence length and rhythm, formatting the content layout to target distinct buyer segments effectively.