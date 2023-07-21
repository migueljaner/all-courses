import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    myErrorStatus: false,
    myError: {},
  };
  //--------------------------------
  static getDerivedStateFromError(error) {
    return {
      myErrorStatus: true,
      myError: error,
    };
  }
  render() {
    if (this.state.myErrorStatus) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.myErrorStatus && this.state.myError.message}
            <br />
            {this.state.myError.componentStack}
          </details>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
export default ErrorBoundary;
