import React from 'react'

const Error = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-2xl font-semibold text-black">Something went wrong!</p>
        <p className="text-gray-600 mt-2">Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-black text-white rounded rounded shadow-md hover:bg-gray-800 transition duration-300 cursor-pointer"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default Error