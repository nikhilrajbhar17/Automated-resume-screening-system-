const analyzeResume = (resumeText, jobRequirements) => {
  let score = 0;

  // Simple keyword matching for skills and experience
  jobRequirements.forEach((requirement) => {
    if (resumeText.toLowerCase().includes(requirement.toLowerCase())) {
      score += 10; // Adjust score per match
    }
  });

  return score;
};

module.exports = { analyzeResume };
