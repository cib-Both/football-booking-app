import { useState } from 'react';
import MatchCard from '../components/MatchCard';
import tickets from '../assets/tickets.png'

const matches = [
  { id: 1, title: 'Visakha vs Ministry FA', date: 'Jun 14, 6:00PM', venue: 'Prince Stadium', image: 'https://pbs.twimg.com/media/FLKehzhVcAIHL8X?format=jpg&name=large' },
  { id: 2, title: 'Angkor Tiger FC vs Life FC', date: 'Jun 15, 7:00PM', venue: 'AIA Stadium', image: 'https://cdn.sabay.com/cdn/media.sabay.com/media/sabay-news/Sport-News/Local-Sports/Event/KMH-Champions/636535f27f156_1667577300_medium.jpg' },
  { id: 3, title: 'Phnom Penh Crown vs Nagaworld', date: 'Jun 20, 6:00PM', venue: 'Smart RSN Stadium', image: 'https://th.bing.com/th/id/R.e34f6fa40a1490dbab571ee8d2684d3f?rik=yRELsldeGw%2b0Kg&riu=http%3a%2f%2fimage.freshnewsasia.com%2f2019%2fPapa%2ffn-2019-03-25-20-37-06-6.jpg&ehk=V0pamovejYa3FUhLKJIoB0GTVLy9Uy5Z%2fsLgzg0vIwg%3d&risl=&pid=ImgRaw&r=0' },

];

const seatPrices = {
  VIP: 20,
  Mid: 10,
  Standard: 5,
};

const Booking = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    tickets: 1,
    seatType: 'VIP',
  });

  const handleBookNow = (match) => {
    setSelectedMatch(match);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', tel: '', email: '', tickets: 1, seatType: 'VIP' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "tickets" && value < 1) return;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const totalPrice = formData.tickets * seatPrices[formData.seatType];
    alert(
      `Booking confirmed for ${selectedMatch.title}!\nSeat Type: ${formData.seatType}\nTotal Price: $${totalPrice}`
    );
    setShowModal(false);
    setFormData({ name: '', tel: '', email: '', tickets: 1, seatType: 'VIP' });
  };

  return (
    <div className="pt-10 pb-60 bg-gray-50">
      <div className="container mx-auto">
       <div className="flex space-x-1 items-center">
         <h2 className="text-3xl font-bold mb-8">Book Your Tickets</h2>
         <img src={tickets} alt="Ticket" className="h-8 mb-8" />
       </div>  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} onBook={() => handleBookNow(match)} />
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-center">
                {selectedMatch.title}
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block font-medium ">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full border p-2 rounded placeholder-gray-400" placeholder=' Full Name'
                  />
                </div>

                {/* Tel */}
                <div>
                  <label className="block font-medium">Tel</label>
                  <input
                    type="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleFormChange}
                    required
                    className="w-full border p-2 rounded placeholder-gray-400" placeholder=' Phone number'
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full border p-2 rounded placeholder-gray-400" placeholder=' Email'
                  />
                </div>

                {/* Tickets */}
                <div>
                  <label className="block font-medium">Tickets</label>
                  <input
                    type="number"
                    name="tickets"
                    min="1"
                    value={formData.tickets}
                    onChange={handleFormChange}
                    required
                    className="w-full border p-2 rounded "
                  />
                </div>

                {/* Seat Type */}
                <div>
                  <label className="block font-medium">Seat Type</label>
                  <select
                    name="seatType"
                    value={formData.seatType}
                    onChange={handleFormChange}
                    className="w-full border p-2 rounded text-gray-700"
                  >
                    {Object.keys(seatPrices).map((type) => (
                      <option key={type} value={type}>
                        {type} (${seatPrices[type]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-red-600 text-white px-7 py-2 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-10 py-2 rounded hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
