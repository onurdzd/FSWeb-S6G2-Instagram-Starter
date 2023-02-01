/* 
  Buradan başlayın ve iç içe geçmiş bileşenlere doğru ilerleyin.
  Projedeki tüm dosyalara kod eklenmesi gerekmez.
  Nerelerde değişiklik yapmanız gerektiğini anlamak için her dosyayı inceleyin.
*/

// State hook u import edin
import React, { useEffect } from "react";
import { useState } from "react";
import Gönderiler from "./bileşenler/Gönderiler/Gönderiler";
import AramaÇubuğu from "./bileşenler/AramaÇubuğu/AramaÇubuğu";
// Gönderiler (çoğul!) ve AramaÇubuğu bileşenlerini import edin, çünkü bunlar App bileşeni içinde kullanılacak
// sahteVeri'yi import edin
import "./App.css";
import sahteVeri from "./sahte-veri";

const App = () => {
  // Gönderi nesneleri dizisini tutmak için "gonderiler" adlı bir state oluşturun, **sahteVeri'yi yükleyin**.
  // Artık sahteVeri'ye ihtiyacınız olmayacak.
  // Arama çubuğunun çalışması için , arama kriterini tutacak başka bir state'e ihtiyacımız olacak.

  const [gonderiler, setGönderiler] = useState([...sahteVeri]);
  const [arama, setArama] = useState("");

  const gonderiyiBegen = (gonderiID) => {
    /*
      Bu fonksiyon, belirli bir id ile gönderinin beğeni sayısını bir artırma amacına hizmet eder.

      Uygulamanın durumu, React ağacının en üstünde bulunur, ancak iç içe geçmiş bileşenlerin stateleri değiştirememesi adil olmaz!
      Bu fonksiyon, belirli bir gönderinin beğeni sayısını artırılmasına olanak sağlamak amacıyla iç içe geçmiş bileşenlere aktarılır.

	  "setGonderi" yi çağırın ve state ine "posts.map" çağrısını iletin.
      `map` içine iletilen callback aşağıdaki mantığı gerçekleştirir:
        - gönderinin idsi "gonderiID" ile eşleşirse, istenen değerlerle yeni bir gönderi nesnesi döndürün.
        - aksi takdirde, sadece gönderi nesnesini değiştirmeden döndürün.
     */

    gonderiler.find((item) => item.id === gonderiID).likes += 1;
    setGönderiler([...gonderiler]);

    //alternatif
    // gonderiler.forEach((item) => {
    //   if (item.id === gonderiID) {
    //     if (gonderiID === 1) {
    //       setGönderiler([
    //         {
    //           id: item.id,
    //           username: item.username,
    //           thumbnailUrl: item.thumbnailUrl,
    //           imageUrl: item.imageUrl,
    //           likes: item.likes + 1,
    //           timestamp: item.timestamp,
    //           comments: item.comments,
    //         },
    //         ...gonderiler.filter((el) => el.id !== gonderiID),
    //       ]);
    //     } else {
    //       setGönderiler([
    //         ...gonderiler.filter((el) => el.id !== gonderiID),
    //         {
    //           id: item.id,
    //           username: item.username,
    //           thumbnailUrl: item.thumbnailUrl,
    //           imageUrl: item.imageUrl,
    //           likes: item.likes + 1,
    //           timestamp: item.timestamp,
    //           comments: item.comments,
    //         },
    //       ]);
    //     }
    //   }
    // });
  };

  const aramaFonk = () => {
    if (arama.length > 0) {
      setGönderiler([
        ...gonderiler.filter((elem) => elem.username.includes(arama)),
      ]);
    } else {
      setGönderiler([...sahteVeri]);
    }
  };

  useEffect(() => {
    aramaFonk();
  }, [arama]);

  return (
    <div className="App">
      {/* AramaÇubuğu ve Gönderiler'i render etmesi için buraya ekleyin */}
      <AramaÇubuğu arama={arama} setArama={setArama} />
      <Gönderiler gonderiyiBegen={gonderiyiBegen} gonderiler={gonderiler} />
      {/* Her bileşenin hangi proplara ihtiyaç duyduğunu kontrol edin, eğer ihtiyaç varsa ekleyin! */}
    </div>
  );
};

export default App;
