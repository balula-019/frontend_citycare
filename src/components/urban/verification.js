/*
  The same verification data reaches the UI in two shapes: flattened onto a
  saved report, and as the raw service payload attached to a rejection error.
  Both are normalised here so the panel only ever renders one shape.
*/

export const verificationFromReport = (report) => {
  if (!report?.verificationDecision && report?.verificationRelevanceScore == null) return null;

  return {
    decision: report.verificationDecision,
    topicMatch: report.verificationTopicMatch,
    descriptionMatch: report.verificationDescriptionMatch,
    relevanceScore: report.verificationRelevanceScore,
    threshold: report.verificationThreshold,
    reason: report.verificationReason,
    scoreNote: report.verificationScoreNote,
    model: report.verificationModel,
    evidence: report.verificationVisibleEvidence || [],
  };
};

export const verificationFromError = (error) => {
  const payload = error?.data?.data;
  if (!payload || typeof payload !== 'object') return null;
  if (payload.relevance_score == null && payload.decision == null) return null;

  return {
    decision: payload.decision,
    topicMatch: payload.topic_match,
    descriptionMatch: payload.description_match,
    relevanceScore: payload.relevance_score,
    threshold: payload.threshold,
    reason: payload.reason,
    scoreNote: payload.score_note,
    model: payload.model,
    evidence: payload.visible_evidence || [],
  };
};
