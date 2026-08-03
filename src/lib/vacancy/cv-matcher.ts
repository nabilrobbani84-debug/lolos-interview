/**
 * CV and Vacancy Requirement Matcher Service
 * Computes Match Scores and lists capability gaps.
 */

import { ExtractedVacancyData } from './parser';
import { VacancyCvMatch } from '../types';

export interface CVDetails {
  skills: string[];
  education: string;
  experienceYears: number;
}

export function matchCvWithVacancy(
  vacancy: ExtractedVacancyData,
  cv: CVDetails
): VacancyCvMatch {
  const matchedRequirements: string[] = [];
  const partiallyMatchedRequirements: string[] = [];
  const missingRequirements: string[] = [];
  const recommendations: string[] = [];

  const cvSkillsLower = cv.skills.map(s => s.toLowerCase());

  // 1. Technical Skills Matching
  const allVacancyTech = [
    ...vacancy.technicalSkills.mustHave,
    ...vacancy.technicalSkills.important,
    ...vacancy.technicalSkills.niceToHave
  ];

  let technicalMatchesCount = 0;
  allVacancyTech.forEach(tech => {
    const techLower = tech.toLowerCase();
    
    // Exact match
    if (cvSkillsLower.includes(techLower)) {
      matchedRequirements.push(tech);
      technicalMatchesCount++;
    } 
    // Partially matched: check substring (e.g. CodeIgniter matches PHP)
    else if (cvSkillsLower.some(s => s.includes(techLower) || techLower.includes(s))) {
      partiallyMatchedRequirements.push(tech);
      technicalMatchesCount += 0.5;
    } 
    // Missing
    else {
      missingRequirements.push(tech);
    }
  });

  const technicalScore = allVacancyTech.length > 0 
    ? Math.round((technicalMatchesCount / allVacancyTech.length) * 100) 
    : 80;

  // 2. Experience Matching
  const experienceScore = cv.experienceYears >= vacancy.experienceYearsMin 
    ? 100 
    : Math.round((cv.experienceYears / vacancy.experienceYearsMin) * 100);

  if (cv.experienceYears < vacancy.experienceYearsMin) {
    missingRequirements.push(`Pengalaman ${vacancy.experienceYearsMin} tahun (CV: ${cv.experienceYears} tahun)`);
  } else {
    matchedRequirements.push(`Pengalaman ${vacancy.experienceYearsMin} tahun`);
  }

  // 3. Education Matching
  const educationScore = 100; // Mock default matching education
  matchedRequirements.push('Pendidikan S1 Informatika');

  // 4. Soft Skills Matching
  let softMatches = 0;
  vacancy.softSkills.forEach(soft => {
    const softLower = soft.toLowerCase();
    if (cvSkillsLower.some(s => s.includes(softLower) || softLower.includes(s))) {
      softMatches++;
    }
  });
  const softSkillScore = vacancy.softSkills.length > 0
    ? Math.round((softMatches / vacancy.softSkills.length) * 100)
    : 90;

  // 5. Total Match Score calculation
  // Technical: 35%, Experience: 20%, Education: 10%, Responsibilities: 15%, Workflow/Tools: 10%, Soft skill: 10%
  const overallMatchScore = Math.round(
    (technicalScore * 0.35) +
    (experienceScore * 0.20) +
    (educationScore * 0.10) +
    (80 * 0.15) + // Responsibilities matching default
    (75 * 0.10) + // Workflow matching default
    (softSkillScore * 0.10)
  );

  // Recommendations formulation
  if (missingRequirements.includes('Laravel')) {
    recommendations.push('Pelajari dasar framework Laravel dan cara membuat REST API menggunakan controller & middleware.');
  }
  if (missingRequirements.includes('Go') || missingRequirements.includes('Golang')) {
    recommendations.push('Pelajari sintaks dasar Golang, struct, interface, dan concurrency goroutine.');
  }
  if (missingRequirements.includes('CI/CD')) {
    recommendations.push('Coba buat workflow deployment otomatis sederhana menggunakan GitHub Actions.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Review materi Optimasi Database Indexing dan Caching sebelum interview.');
  }

  return {
    id: `match-${Date.now()}`,
    vacancyId: 'custom-vac-1',
    overallMatchScore,
    technicalMatchScore: technicalScore,
    experienceMatchScore: experienceScore,
    educationMatchScore: educationScore,
    matchedRequirements,
    partiallyMatchedRequirements,
    missingRequirements,
    recommendations
  };
}
