import React, { useState } from "react"; // React ve useState hook'u içe aktarılıyor
import { List, ListItem, ListItemText, IconButton, TextField, Button } from "@mui/material"; // Material-UI bileşenleri içe aktarılıyor
import { Delete, Edit } from "@mui/icons-material"; // Material-UI'nın ikonları içe aktarılıyor

// ContactList bileşeni için props türü tanımı
interface ContactListProps {
  contacts: { id: number; name: string; phone: string }[]; // Kişilerin listesi (id, isim ve telefon numarası içerir)
  deleteContact: (id: number) => void; // Bir kişiyi silmek için kullanılan fonksiyon
  updateContact: (id: number, updatedPhone: string) => void; // Bir kişinin telefon numarasını güncellemek için kullanılan fonksiyon
}

// ContactList bileşeninin tanımı
const ContactList: React.FC<ContactListProps> = ({ contacts, deleteContact, updateContact }) => {
  // Düzenlenen kişi ID'sini tutan state
  const [editingId, setEditingId] = useState<number | null>(null); // Şu anda düzenlenen kişinin ID'si (null ise düzenleme yok)
  const [newPhone, setNewPhone] = useState(""); // Düzenleme sırasında girilen yeni telefon numarası

  return (
    <List>
      {/* Kişi listesi üzerinde gezinmek için map fonksiyonu kullanılıyor */}
      {contacts.map((contact) => (
        <ListItem key={contact.id}>
          {/* Kişinin adı ve telefon numarası */}
          <ListItemText primary={contact.name} secondary={contact.phone} />

          {/* Eğer kişi düzenleniyorsa, düzenleme alanını göster */}
          {editingId === contact.id ? (
            <div>
              {/* Yeni telefon numarası girişi için TextField */}
              <TextField
                label="New Phone" // Etiket
                value={newPhone} // TextField'ın değeri, newPhone state'i tarafından kontrol edilir
                onChange={(e) => setNewPhone(e.target.value)} // Kullanıcı yazdığında newPhone güncellenir
                size="small" // TextField boyutu küçük olarak ayarlanır
              />
              {/* Yeni telefon numarasını kaydetmek için Save butonu */}
              <Button
                variant="contained" // Dolgulu bir buton stili kullanılıyor
                size="small" // Buton boyutu küçük
                onClick={() => {
                  updateContact(contact.id, newPhone); // updateContact fonksiyonunu çağırır
                  setEditingId(null); // Düzenleme modu kapatılır
                  setNewPhone(""); // TextField sıfırlanır
                }}
              >
                Save
              </Button>
              {/* Düzenlemeyi iptal etmek için Cancel butonu */}
              <Button
                variant="outlined" // Çerçeveli bir buton stili kullanılıyor
                size="small" // Buton boyutu küçük
                onClick={() => setEditingId(null)} // Düzenleme modu kapatılır
              >
                Cancel
              </Button>
            </div>
          ) : (
            // Eğer kişi düzenlenmiyorsa, düzenleme ikonunu göster
            <IconButton onClick={() => setEditingId(contact.id)}> 
              <Edit /> {/* Düzenleme için kalem ikonu */}
            </IconButton>
          )}

          {/* Kişiyi silmek için silme ikonu */}
          <IconButton onClick={() => deleteContact(contact.id)}>
            <Delete /> {/* Silme için çöp kutusu ikonu */}
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList; // Bileşeni dışa aktarma
