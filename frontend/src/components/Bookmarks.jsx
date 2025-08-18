import { Play, ExternalLink, BookOpen, Crown } from "lucide-react";

function Bookmarks({ q }) {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-200">
      <div className="card-body space-y-4">
        {/* Title */}
        <h2 className="card-title text-lg font-semibold">
          {q.title}
        </h2>

        {/* Divider */}
        <div className="divider my-0"></div>

        {/* Resource Links */}
        <div className="space-y-3">
          {/* YouTube Link */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-base-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">YouTube Resource</span>
            </div>
            {q.yt_link ? (
              <a
                href={q.yt_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-error gap-2 bg-red-500"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            ) : (
              <span className="badge badge-ghost">N/A</span>
            )}
          </div>

          {/* Practice Free Link */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-base-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Practice (Free)</span>
            </div>
            {q.p1_link ? (
              <a
                href={q.p1_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            ) : (
              <span className="badge badge-ghost">N/A</span>
            )}
          </div>

          {/* Practice Plus Link */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-base-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-600 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Practice (Plus)</span>
            </div>
            {q.p2_link ? (
              <a
                href={q.p2_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-secondary gap-2 bg-y"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            ) : (
              <span className="badge badge-ghost">N/A</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
