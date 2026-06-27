/**
 * @param {Object} props
 * @param {boolean} props.isLoading - System async execution network spinner visibility trigger flag
 */
export default function Loader({ isLoading }) {
  if (!isLoading) return null;
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-6 h-6 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
}