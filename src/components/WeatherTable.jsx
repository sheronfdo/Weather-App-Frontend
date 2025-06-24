import React from 'react';

const WeatherTable = ({ historical, forecast }) => {
  const timeGroups = [
    "00:00–03:00",
    "03:00–06:00",
    "06:00–09:00",
    "09:00–12:00",
    "12:00–15:00",
    "15:00–18:00",
    "18:00–21:00",
    "21:00–00:00"
  ];

  const groupData = (hourly, startHour, endHour) => {
    if (!hourly || hourly.length === 0) return null;
    const indices = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
    const group = hourly.slice(startHour, endHour + 1);
    if (group.length === 0) return null;
    const avgTemp = group.reduce((sum, h) => sum + h.temp, 0) / group.length;
    const precip = group.reduce((sum, h) => sum + h.precip, 0);
    const conditions = group.map(h => h.condition);
    const conditionCounts = conditions.reduce((acc, c) => {
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});
    const mostFrequentCondition = Object.keys(conditionCounts).reduce((a, b) =>
      conditionCounts[a] > conditionCounts[b] ? a : b
    );
    const icon = group.find(h => h.condition === mostFrequentCondition)?.icon || hourly[startHour]?.icon;
    return {
      temp: avgTemp.toFixed(1),
      condition: mostFrequentCondition,
      precip: precip.toFixed(2),
      icon
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Weather Data</h2>
      <table className="w-full text-sm text-gray-800">
        <thead>
          <tr>
            <th className="p-2 text-left">Time</th>
            {historical.map(h => (
              <th key={h.date} className="p-2">{h.date}</th>
            ))}
            {forecast.map(f => (
              <th key={f.date} className="p-2">{f.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeGroups.map((time, groupIndex) => (
            <tr key={groupIndex} className="border-t">
              <td className="p-2">{time}</td>
              {historical.map(h => {
                const data = groupData(h.hourly, groupIndex * 3, groupIndex * 3 + 2);
                return (
                  <td key={h.date} className="p-2">
                    {data ? (
                      <div className="flex items-center weather-icon-container relative">
                        <img
                          src={data.icon}
                          alt="Weather icon"
                          className="w-8 h-8 mr-2 weather-icon"
                        />
                        <span className="tooltip">{data.condition}</span>
                        <span>
                          {data.temp}°C
                        </span>
                      </div>
                    ) : '-'}
                  </td>
                );
              })}
              {forecast.map(f => {
                const data = groupData(f.hourly, groupIndex * 3, groupIndex * 3 + 2);
                return (
                  <td key={f.date} className="p-2">
                    {data ? (
                      <div className="flex items-center weather-icon-container relative">
                        <img
                          src={data.icon}
                          alt="Weather icon"
                          className="w-8 h-8 mr-2 weather-icon"
                        />
                        <span className="tooltip">{data.condition}</span>
                        <span>
                          {data.temp}°C, Precip: {data.precip} mm
                        </span>
                      </div>
                    ) : '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;