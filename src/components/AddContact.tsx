import React, { useState } from "react"; // React ve useState hook'u içe aktarılıyor
import { TextField, Button, Box } from "@mui/material"; // Material-UI bileşenleri içe aktarılıyor

// AddContact bileşeni için props türü tanımı
interface AddContactProps {
  addContact: (name: string, phone: string) => void; // addContact fonksiyonunu bir prop olarak alır
}

// AddContact bileşeninin tanımı
const AddContact: React.FC<AddContactProps> = ({ addContact }) => {
  // name ve phone değerlerini saklamak için iki ayrı state tanımlanıyor
  const [name, setName] = useState(""); // Kullanıcının girdiği isim-soyisim
  const [phone, setPhone] = useState(""); // Kullanıcının girdiği telefon numarası

  // Form gönderimi için handleSubmit fonksiyonu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    if (!name || !phone) return; // Eğer name ya da phone boş ise işlem yapılmaz
    addContact(name, phone); // Yeni kişi bilgilerini addContact fonksiyonuna gönderir
    setName(""); // Form gönderildikten sonra name alanını sıfırlar
    setPhone(""); // Form gönderildikten sonra phone alanını sıfırlar
  };

  return (
    <Box
      component="form" // Box bileşeni form olarak tanımlanıyor
      onSubmit={handleSubmit} // Form gönderildiğinde handleSubmit çalışır
      sx={{ mb: 3 }} // Formun altında margin (boşluk) ekleniyor
    >
      {/* İsim-soyisim girişi için TextField */}
      <TextField
        label="Name Surname" // Etiket
        variant="outlined" // Çerçeve tipi (Material UI stilleri)
        fullWidth // Genişlik tam ekranı kaplayacak şekilde ayarlanıyor
        value={name} // TextField'ın değerini name state'i belirler
        onChange={(e) => setName(e.target.value)} // Kullanıcı yazdığında name state'i güncellenir
        sx={{ mb: 2 }} // TextField'ın altında margin (boşluk) ekleniyor
      />
      {/* Telefon numarası girişi için TextField */}
      <TextField
        label="Phone Number" // Etiket
        variant="outlined" // Çerçeve tipi (Material UI stilleri)
        fullWidth // Genişlik tam ekranı kaplayacak şekilde ayarlanıyor
        value={phone} // TextField'ın değerini phone state'i belirler
        onChange={(e) => setPhone(e.target.value)} // Kullanıcı yazdığında phone state'i güncellenir
        sx={{ mb: 2 }} // TextField'ın altında margin (boşluk) ekleniyor
      />
      {/* Form gönderim butonu */}
      <Button
        type="submit" // Button'un tipi submit olarak ayarlanıyor
        variant="contained" // Dolgulu bir buton stili kullanılıyor
        color="primary" // Buton rengi mavi
        fullWidth // Genişlik tam ekranı kaplayacak şekilde ayarlanıyor
      >
        Add {/* Butonun üzerinde gösterilecek metin */}
      </Button>
    </Box>
  );
};

export default AddContact; // Bileşeni dışa aktarma
