import React, { useState, useEffect } from 'react';
import AddContact from './components/AddContact'; // Yeni kişi eklemek için form bileşeni
import ContactList from './components/ContactList'; // Kişi listesini göstermek için liste bileşeni
import { Container, Typography, TextField } from "@mui/material"; // Material UI bileşenleri

function App() {
  // Tüm kişileri saklamak için state ve LocalStorageden alınması
  const [contacts, setContacts] = useState<{ id: number; name: string; phone: string }[]>(
    () => {
      const savedContacts = localStorage.getItem("contacts");
      return savedContacts ? JSON.parse(savedContacts) : [];
    }
  );

  // Arama sorgusunu saklamak için state
  const [searchQuery, setSearchQuery] = useState("");

  // Kişi ekleme fonksiyonu
  const addContact = (name: string, phone: string) => {
    // Yeni kişi objesi oluşturma
    const newContact = { id: Date.now(), name, phone };

    // Yeni kişiyi mevcut kişilere ekleme
    setContacts([...contacts, newContact]);
  };

  // Kişi güncelleme fonksiyonu
  const updateContact = (id: number, updatedPhone: string) => {
    // Belirtilen kişiyi bulup telefon numarasını güncelleme
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, phone: updatedPhone } : contact
      )
    );
  };

  // Kişi silme fonksiyonu
  const deleteContact = (id: number) => {
    // Belirtilen kişiyi kişiler listesinden kaldırma
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // LocalStorage'dan verileri alma (sayfa yenilendiğinde verileri saklamak için)
  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // LocalStorage'a verileri kaydetme (kişiler state'i değiştiğinde otomatik çalışır)
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Arama sorgusuna göre filtrelenmiş kişileri döndürme
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || // İsimde arama sorgusunu arama
      contact.phone.includes(searchQuery) // Telefonda arama sorgusunu arama
  );

  return (
    <Container sx={{ mt: 5 }}> {/* Ana kapsayıcı, margin-top ile yukarıdan boşluk ekleniyor */}
      <Typography variant="h4" align="center" gutterBottom>
        Members {/* Başlık */}
      </Typography>
      
      {/* Arama alanı */}
      <TextField
        label="Search Contacts" // Alanın etiketi
        variant="outlined" // Material UI stilleri
        fullWidth // Alanın tam genişlik kaplaması
        margin="normal" // Material UI margin standardı
        value={searchQuery} // State'ten alınan arama sorgusu
        onChange={(e) => setSearchQuery(e.target.value)} // Kullanıcı yazdığında arama sorgusunu güncelleme
      />

      {/* Yeni kişi eklemek için form */}
      <AddContact addContact={addContact} />

      {/* Kişi listesi */}
      <ContactList
        contacts={filteredContacts} // Filtrelenmiş kişiler
        deleteContact={deleteContact} // Kişi silme fonksiyonu
        updateContact={updateContact} // Kişi güncelleme fonksiyonu
      />
    </Container>
  );
}

export default App; // Bileşeni dışa aktarma
