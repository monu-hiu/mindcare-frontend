import { useState, useRef, useEffect } from "react";
import "./DropdownSelect.css";

function DropdownSelect({ options, value, onChange, placeholder = "Select option", multiple = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isSelected = (opt) => {
    if (multiple) return Array.isArray(value) && value.includes(opt.value);
    return value === opt.value;
  };

  const handleSelect = (opt) => {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];
      if (arr.includes(opt.value)) {
        onChange(arr.filter((v) => v !== opt.value));
      } else {
        onChange([...arr, opt.value]);
      }
    } else {
      onChange(opt.value);
      setOpen(false);
    }
  };

  const getLabel = () => {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];
      if (arr.length === 0) return placeholder;
      if (arr.length === 1) return arr[0];
      return `${arr.length} selected`;
    }
    const found = options.find((o) => o.value === value);
    return found ? `${found.emoji ? found.emoji + " " : ""}${found.label}` : placeholder;
  };

  return (
    <div className="ddWrapper" ref={ref}>
      <button
        type="button"
        className={`ddTrigger ${open ? "open" : ""} ${(multiple ? value?.length > 0 : value) ? "hasValue" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className="ddTriggerLabel">{getLabel()}</span>
        <span className={`ddArrow ${open ? "up" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="ddMenu">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`ddOption ${isSelected(opt) ? "selected" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              <span className="ddOptionLeft">
                {opt.emoji && <span className="ddEmoji">{opt.emoji}</span>}
                <span className="ddOptionLabel">{opt.label}</span>
                {opt.desc && <span className="ddOptionDesc">{opt.desc}</span>}
              </span>
              {isSelected(opt) && <span className="ddCheck">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSelect;