import React from "react";

function debounce(fn, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}

const UtilityAPI = (() => {
  async function search(query, includeUnsupported = false) {
    const url = new URL(
      "https://utilityapi.com/api/experimental/utility-lookup"
    );
    url.searchParams.set("q", query);
    url.searchParams.set("include_unsupported", includeUnsupported);
    const res = await fetch(url);
    return res.json();
  }

  return { search };
})();

function UtilitySearchPage() {
  const [isInclusive, setIsInclusive] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [utilities, setUtilities] = React.useState(null);

  const updateSearchResults = React.useCallback(
    debounce(async (query, isInclusive) => {
      const body = await UtilityAPI.search(query, isInclusive);
      setUtilities(body.utilities);
    }, 300),
    []
  );

  React.useEffect(() => {
    updateSearchResults(search, isInclusive);
  }, [search, isInclusive]);

  return (
    <div className="page">
      <h1>Searching for a utility?</h1>
      <h2>Look no further!</h2>
      <input
        className="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search utilities..."
        type="text"
        value={search}
      />
      <label className="checkbox">
        <input
          type="checkbox"
          onChange={() => setIsInclusive(!isInclusive)}
          value={isInclusive}
        />
        Include unsupported utilities
      </label>
      <Utilities list={utilities} />
    </div>
  );
}

function Utilities({ list }) {
  const [selected, setSelected] = React.useState(null);

  if (!list) return;

  // for the sake of performance, show only the first 100
  const utilities = list.filter((u) => !!u.name).slice(0, 100);

  return (
    <ul className="utilities">
      {utilities.map((utility) => (
        <Utility
          key={utility.name}
          onClick={() => setSelected(utility.name)}
          selected={selected === utility.name}
          utility={utility}
        />
      ))}
    </ul>
  );
}

function Utility({ onClick, selected, utility }) {
  return (
    <li
      className="utility"
      role="button"
      aria-expanded={selected}
      onClick={onClick}
    >
      <div className="name">{utility.name}</div>
      {selected && (
        <>
          <div className="details">
            <span>ID: {utility.id || "N/A"}</span>
          </div>
          <div className="actions">
            {utility.id && (
              <a
                href={
                  "https://utilityapi.com/docs/utilities/" +
                  utility.id.toLowerCase()
                }
              >
                Learn more
              </a>
            )}
            {utility.third_party_registration && (
              <a href={utility.third_party_registration}>Register</a>
            )}
          </div>
        </>
      )}
    </li>
  );
}

export default UtilitySearchPage;
