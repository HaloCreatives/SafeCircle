import React, { useState } from 'react';
import { Phone } from 'lucide-react';

interface Contact {
  name: string;
  phone: string;
}

export function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contacts.length < 3) {
      setContacts([...contacts, { name, phone }]);
      setName('');
      setPhone('');
    }
  };

  const emergencyNumbers = [
    { name: 'Emergency', number: '911' },
    { name: 'Police', number: '999' },
    { name: 'Fire', number: '990' },
    { name: 'Ambulance', number: '811' },
    { name: 'Crime Stoppers', number: '800-TIPS' },
    { name: 'Anti Crime Hotline', number: '555' },
    { name: 'ODPM', number: '800-ODPM' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Family Emergency Contacts</h2>
        <form onSubmit={addContact} className="space-y-4 mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 rounded-md border-gray-300 focus:border-[#67DD00] focus:ring focus:ring-[#67DD00] focus:ring-opacity-50"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 rounded-md border-gray-300 focus:border-[#67DD00] focus:ring focus:ring-[#67DD00] focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={contacts.length >= 3}
            className="bg-[#67DD00] text-white px-4 py-2 rounded-md hover:bg-[#5ac500] disabled:opacity-50"
          >
            Add Contact ({contacts.length}/3)
          </button>
        </form>
        <div className="space-y-2">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              <Phone className="w-4 h-4 text-[#67DD00]" />
              <span>{contact.name}: {contact.phone}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Emergency Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {emergencyNumbers.map((emergency, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              <Phone className="w-4 h-4 text-[#67DD00]" />
              <span className="font-medium">{emergency.name}:</span>
              <span className="text-[#67DD00]">{emergency.number}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}