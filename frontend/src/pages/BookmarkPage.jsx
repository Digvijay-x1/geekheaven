import Navbar from '../components/Navbar';
import Bookmarks from '../components/Bookmarks';
import useBookmarks from '../stores/useBookmarks';

const BookmarkPage = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {bookmarks.bookmarks.length > 0 ? (
          bookmarks.bookmarks.map((q) => (
            <Bookmarks key={q._id} q={q} />
          ))
        ) : (
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body text-center py-16">
              <p className="text-xl text-base-content">No bookmarks yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;