// components/ApiIntegration.tsx
import { useState } from 'react'
export default function ApiIntegration() {
    const [apiUrl, setApiUrl] = useState('')
    const [isConnecting, setIsConnecting] = useState(false)
  
    const handleConnect = async () => {
      setIsConnecting(true)
      try {
        // Implement API connection logic here
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      } catch (error) {
        console.error('Error connecting to API:', error)
      } finally {
        setIsConnecting(false)
      }
    }
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Municipal API</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="api-url" className="block text-sm font-medium text-gray-700">
              API Endpoint
            </label>
            <input
              type="text"
              id="api-url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://api.municipality.com"
            />
          </div>
          <button
            onClick={handleConnect}
            disabled={isConnecting || !apiUrl}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    )
  }