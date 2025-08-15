import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('http://localhost:4000/user/me', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch user profile');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!user) return <div className="p-8 text-center">No user data found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center gap-6 mb-6">
        {user.profilePic && (
          <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border" />
        )}
        <div>
          <h2 className="text-2xl font-bold mb-1">{user.fullname}</h2>
          <div className="text-gray-700">{user.email}</div>
          <div className="text-gray-500 text-sm">Role: {user.role}</div>
          <div className="text-gray-500 text-sm">Location: {user.location}</div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Submissions</h3>
      {user.submissions && user.submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Problem</th>
                <th className="px-3 py-2 border">Status</th>
                <th className="px-3 py-2 border">Submitted At</th>
                <th className="px-3 py-2 border">Code</th>
              </tr>
            </thead>
            <tbody>
              {user.submissions.map((sub, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-2 border">{sub.problem?.title || sub.problem}</td>
                  <td className={`px-3 py-2 border font-bold ${sub.status === 'Success' ? 'text-green-600' : 'text-red-600'}`}>{sub.status}</td>
                  <td className="px-3 py-2 border">{new Date(sub.submittedAt).toLocaleString()}</td>
                  <td className="px-3 py-2 border">
                    <details>
                      <summary className="cursor-pointer text-blue-600 underline">View</summary>
                      <pre className="bg-gray-50 p-2 rounded text-xs whitespace-pre-wrap max-w-xs overflow-x-auto">{sub.code}</pre>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-500">No submissions yet.</div>
      )}
    </div>
  );
} 