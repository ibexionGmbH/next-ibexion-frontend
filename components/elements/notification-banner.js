import classNames from 'classnames'
import MarkdownRender from 'utils/MarkdownRender'

const NotificationBanner = ({ data: { text, type }, closeSelf }) => {
  if (text)
    return (
      <div
        className={classNames(
          // Common classes
          'text-white px-2 py-2',
          {
            // Apply theme based on notification type
            'bg-pink-600': type === 'info',
            'bg-yellow-600': type === 'warning',
            'bg-red-600': type === 'alert',
          }
        )}
      >
        <div className="container flex flex-row justify-between items-center">
          <div className="flex-1 rich-text-banner">
            <MarkdownRender>{text} </MarkdownRender>
          </div>
          <button onClick={closeSelf} className="flex-shrink-0 py-1 px-1">
            <div className="w-auto h-6 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    )
  return null
}

export default NotificationBanner
