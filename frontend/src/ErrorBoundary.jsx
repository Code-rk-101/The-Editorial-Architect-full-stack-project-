import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here (like Sentry or LogRocket)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiAlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Oops, something went wrong
            </h2>
            <p className="text-slate-500 mb-6 text-sm">
              We encountered an unexpected error while trying to display this
              page.
            </p>

            <div className="bg-slate-50 p-4 rounded-lg text-left overflow-auto mb-6 max-h-32 text-xs font-mono text-slate-600 border border-slate-200">
              {this.state.error?.toString()}
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors w-full"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
