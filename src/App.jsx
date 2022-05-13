import "./App.css";
import * as React from "react";
import { useState } from "react";

function ShowDate({ date }) {
  return (
    <div>
      Date: {date || "not set"}
    </div>
  );
}

function App() {
  const [components, setComponents] = useState([ShowDate]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const urlInput = form.querySelector("[name=url]");
    try {
      const module = await import(/* @vite-ignore */ urlInput.value);
      const component = module.default(React);
      setComponents(components => [...components, component]);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-4">
        <form className="flex items-center justify-between" onSubmit={handleSubmit}>
          <input
            className="border border-neutral-600 rounded p-2 flex-1 mr-4"
            name="url"
            placeholder="Widget URL"
          />
          <button
            className="rounded-md bg-neutral-600 px-4 py-2 border text-neutral-50"
            type="submit"
          >
            Add widget
          </button>
        </form>
        <div className="mt-4 text-sm">
          Try these URLs:
          <ul>
            <li>https://alvpot.github.io/DateInputWidget.js</li>
            <li>https://alvpot.github.io/FilteredTableWidget.js</li>
          </ul>
        </div>
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </div>
      {components.map((Component, i) => (
        <div className="mt-4 max-w-2xl mx-auto bg-white rounded-lg p-4" key={i}>
          <Component
            date={date}
            onChangeDate={setDate}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
