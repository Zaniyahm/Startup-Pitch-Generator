const promptInput = document.getElementById("promptInput");
const industrySelect = document.getElementById("industrySelect");
const audienceSelect = document.getElementById("audienceSelect");
const toneSelect = document.getElementById("toneSelect");
const generateBtn = document.getElementById("generateBtn");
const resultDiv = document.getElementById("result");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  const industry = industrySelect.value;
  const audience = audienceSelect.value;
  const tone = toneSelect.value;

  if (!prompt) {
    resultDiv.innerHTML = "<p class='text-red-500'>Please enter a startup idea.</p>";
    return;
  }

  resultDiv.innerHTML = "<p class='text-gray-400'>Generating...</p>";

  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, industry, audience, tone })
    });

    const data = await response.json();

    if (data.pitch) {
      resultDiv.innerHTML = `<p class='text-green-300'>${data.pitch}</p>`;
    } else {
      resultDiv.innerHTML = `<p class='text-red-500'>Error: ${data.detail || 'Failed to generate pitch.'}</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p class='text-red-500'>Error: ${err.message}</p>`;
  }
});