import { AGE_BANDS, ELECTION_STAGES, REGISTRATION_STATUSES, VOTER_EXPERIENCES } from "@/lib/profile-schema";
import { GuidanceResult, UserProfile } from "@/lib/types";
import { getUiCopy } from "@/lib/copy";
import { AuthButtons } from "./auth-buttons";

type ProfileFormProps = {
  guidance: GuidanceResult;
  profile: UserProfile;
  ui: ReturnType<typeof getUiCopy>;
  onProfileChange: <Key extends keyof UserProfile>(key: Key, value: UserProfile[Key]) => void;
};

export function ProfileForm({ guidance, profile, ui, onProfileChange }: ProfileFormProps) {
  return (
    <article className="panel" aria-labelledby="profile-title">
      <div className="status-row">
        <h2 className="card-title" id="profile-title">
          {ui.profileTitle}
        </h2>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <AuthButtons />
          <span className={`urgency-badge urgency-${guidance.urgency}`}>
            {guidance.urgency} {ui.urgencySuffix}
          </span>
        </div>
      </div>
      <p className="supporting-text">{ui.profileDescription}</p>
      <div className="fields">
        <div className="field">
          <label htmlFor="name">{ui.labels.name}</label>
          <input
            id="name"
            value={profile.name}
            onChange={(event) => onProfileChange("name", event.target.value)}
            placeholder={ui.placeholders.name}
          />
        </div>
        <div className="field">
          <label htmlFor="ageBand">{ui.labels.ageBand}</label>
          <select
            id="ageBand"
            value={profile.ageBand}
            onChange={(event) => onProfileChange("ageBand", event.target.value as UserProfile["ageBand"])}
          >
            {AGE_BANDS.map((ageBand) => (
              <option key={ageBand} value={ageBand}>
                {ageBand}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="experience">{ui.labels.experience}</label>
          <select
            id="experience"
            value={profile.experience}
            onChange={(event) => onProfileChange("experience", event.target.value as UserProfile["experience"])}
          >
            {VOTER_EXPERIENCES.map((experience) => (
              <option key={experience} value={experience}>
                {ui.options.experience[experience]}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="registrationStatus">{ui.labels.registrationStatus}</label>
          <select
            id="registrationStatus"
            value={profile.registrationStatus}
            onChange={(event) =>
              onProfileChange("registrationStatus", event.target.value as UserProfile["registrationStatus"])
            }
          >
            {REGISTRATION_STATUSES.map((registrationStatus) => (
              <option key={registrationStatus} value={registrationStatus}>
                {ui.options.registrationStatus[registrationStatus]}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="stage">{ui.labels.stage}</label>
          <select
            id="stage"
            value={profile.stage}
            onChange={(event) => onProfileChange("stage", event.target.value as UserProfile["stage"])}
          >
            {ELECTION_STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {ui.options.stage[stage]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
}
