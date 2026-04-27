import { Dispatch, SetStateAction } from "react";
import { getUiCopy } from "@/lib/copy";
import { AssistantResponse } from "@/lib/types";

type AssistantPanelProps = {
  assistantResponse: AssistantResponse | null;
  isPending: boolean;
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  ui: ReturnType<typeof getUiCopy>;
  onAskAssistant: () => void;
};

export function AssistantPanel({
  assistantResponse,
  isPending,
  onAskAssistant,
  question,
  setQuestion,
  ui
}: AssistantPanelProps) {
  return (
    <article className="chat-panel" aria-labelledby="assistant-title">
      <div className="status-row">
        <h2 className="section-title" id="assistant-title">
          {ui.sections.askAssistant}
        </h2>
        <span className="tiny">{ui.sections.processOnly}</span>
      </div>
      <p className="supporting-text">{ui.sections.assistantPrompt}</p>
      <div className="field">
        <label htmlFor="question">{ui.labels.question}</label>
        <textarea
          id="question"
          rows={5}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={ui.placeholders.question}
        />
      </div>
      <div className="cta-row">
        <button className="primary-button" type="button" onClick={onAskAssistant} disabled={isPending}>
          {isPending ? ui.sections.thinking : ui.sections.askButton}
        </button>
      </div>
      {assistantResponse ? (
        <div className="assistant-answer" aria-live="polite">
          <strong>{getAnswerLabel(assistantResponse, ui)}</strong>
          <p>{assistantResponse.answer}</p>
        </div>
      ) : null}
    </article>
  );
}

function getAnswerLabel(assistantResponse: AssistantResponse, ui: ReturnType<typeof getUiCopy>): string {
  if (assistantResponse.sourceMode === "gemini") {
    return ui.sections.geminiAnswer;
  }

  if (assistantResponse.sourceMode === "refusal") {
    return ui.sections.refusalAnswer;
  }

  return ui.sections.fallbackAnswer;
}
