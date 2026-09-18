import React from 'react';

// Small presentational helpers shared across blog posts.

export const ExtLink = ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
        {children}
    </a>
);

export const Code = ({ children }) => (
    <code className="bg-gray-100 px-2 py-1 rounded">{children}</code>
);

export const CodeBlock = ({ children }) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-base">
        <code>{children}</code>
    </pre>
);

// Results table. Columns from `numericFrom` onward are right-aligned;
// `codeFirst` renders the label column in monospace (for cell / metric names).
export const ResultsTable = ({ head, rows, numericFrom = 1, codeFirst = false }) => (
    <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-gray-300 text-base">
            <thead>
                <tr className="bg-gray-100">
                    {head.map((h, i) => (
                        <th
                            key={h}
                            className={`border border-gray-300 px-4 py-2 ${
                                i >= numericFrom ? 'text-right' : 'text-left'
                            }`}
                        >
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row[0]} className={row.bold ? 'font-bold bg-gray-50' : ''}>
                        {row.map((cell, i) => (
                            <td
                                key={`${row[0]}-${i}`}
                                className={`border border-gray-300 px-4 py-2 ${
                                    i >= numericFrom ? 'text-right tabular-nums' : 'text-left'
                                }`}
                            >
                                {i === 0 && codeFirst ? <code>{cell}</code> : cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
