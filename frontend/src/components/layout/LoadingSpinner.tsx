const LoadingSpinner = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-center h-96 bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    )
}

export default LoadingSpinner