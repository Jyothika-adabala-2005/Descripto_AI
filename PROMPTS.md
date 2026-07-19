# AI Engineering & Prompt Architecture Log

## 1. System Prompt & Role

## 2. Prompt Variations Tested
* **Variation 1 (Baseline):** `Generate a product description for ${prodName} with ingredients ${ingredients}, weight ${weight}, and features ${features}. Use a ${tone} tone.`
  * *Input:* Mysuru Pak, sugar/ghee, 200g, tasty/melt-in-mouth, Luxury.
  * *Output:* This is a delicious Mysuru Pak made with sugar and ghee. It weighs 200g. It is tasty and melts in your mouth. Buy it now for an elegant experience.
* **Variation 2 (Structured Layout):** `Create a product description based on these attributes: - Name: ${prodName} - Ingredients: ${ingredients}. Use a ${tone} tone. Structure with a single introductory paragraph followed by bullet points.`
  * *Input:* Mysuru Pak, sugar/ghee, 200g, tasty/melt-in-mouth, Luxury.
  * *Output:* Indulge in our premium traditional sweet confectionery. Crafted expertly for those who appreciate authentic heritage flavors.
    - Exquisite Blend: Made from pure, golden clarified ghee and fine sugar.
    - Perfect Texture: Delicate blocks that immediately melt in your mouth.
* **Variation 3 (Selected Production Prompt):** `Generate a highly persuasive, marketplace-optimized product description asset based on the following attributes: - Product Name: ${prodName} - Materials Used: ${ingredients} - Unique Features: ${features}. CRUCIAL INSTRUCTION: Generate the output using a strict, high-quality "${tone}" marketing tone alignment. Structure the output text beautifully: open with an attention-grabbing hook paragraph, followed by a clean bulleted list.`
  * *Input:* Mysuru Pak, sugar/ghee, 200g, tasty/melt-in-mouth, Luxury.
  * *Output:* Experience the gold standard of traditional sweet luxury. Every bite of this premium 200g Mysuru Pak offers a journey into royal culinary heritage, balancing sweetness and rich texture.
    * Golden Perfection: Infused with premium, aromatic clarified ghee and fine sugar.
    * Heavenly Texture: Expertly prepared to deliver an iconic melt-in-mouth consistency.

## 3. Comparative Selection & Justification
Variation 3 worked best because it explicitly enforces structural formatting guardrails (separating an attention-grabbing paragraph from a clean bulleted list), preventing generic text blobs. Additionally, it accurately maps the dynamic tone variable, shifting vocabulary fluidly between premium descriptors and product utility depending on user choice.