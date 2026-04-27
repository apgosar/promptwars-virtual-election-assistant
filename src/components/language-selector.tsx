import { UserLanguage } from "@/lib/types";

type LanguageSelectorProps = {
  label: string;
  language: UserLanguage;
  options: Record<UserLanguage, string>;
  onLanguageChange: (language: UserLanguage) => void;
};

export function LanguageSelector({ label, language, options, onLanguageChange }: LanguageSelectorProps) {
  return (
    <section className="topbar" aria-label="Language selector">
      <div className="topbar-inner">
        <label className="topbar-label" htmlFor="page-language">
          {label}
        </label>
        <div className="topbar-select-wrap">
          <select
            id="page-language"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as UserLanguage)}
          >
            {Object.entries(options).map(([value, optionLabel]) => (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
