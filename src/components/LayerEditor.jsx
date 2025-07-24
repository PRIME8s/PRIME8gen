import { useEffect, useRef, useState } from 'react';

const baseURL = 'https://raw.githubusercontent.com/PRIME8s/Full-Body-PRIME8/main/assets';

const layers = {
  eyes: ["APE MOG.png", "Black.png", "Blue Beams.png", "Blue.png", "Bored.png", "Brown.png", "Closed.png", "Crash Dummy.png", "Eye Patch.png", "GOB.png", "Googles.png", "Green.png", "Grey.png", "Hacker.png", "Hazel.png", "Hetero.png", "High.png", "Laser.png", "Layer 11 2.png", "Layer 11.png", "Layer 2.png", "Layer 22.png", "Layer 24.png", "Layer 25.png", "Layer 28.png", "Layer 30.png", "Layer 33.png", "Layer 34.png", "Layer 35.png", "Layer 36.png", "Layer 38.png", "Layer 39.png", "Layer 4.png", "Layer 40.png", "Layer 41.png", "Layer 6.png", "Layer 7.png", "MOG.png", "NPC.png", "Not Cult.png", "Pink.png", "Purple.png", "Red.png", "Robo.png", "Scouter.png", "Stoned.png", "Sus.png", "Tired.png", "Visor.png", "Zombie.png"],
  fur: ["AI.png", "Alien.png", "Blue.png", "Brown.png", "Cheetah.png", "Cream.png", "DMT.png", "Death Bot.png", "Ember.png", "GOB.png", "Ghost.png", "Gold.png", "Golden Brown.png", "Golden Skellz.png", "Green.png", "Grey.png", "Incognito.png", "Magenta.png", "Noise.png", "OG.png", "Orange.png", "Pink Cheetah.png", "Pink.png", "Purp.png", "Red.png", "Skell.png", "Stone.png", "Tiger.png", "Trippy.png", "White.png", "Yellow.png", "Zombie.png"],
  hat: ["APE Brim Black.png", "APE Brim Cyan.png", "APE Brim Green.png", "APE Brim Magenta.png", "APE Brim Pink.png", "APE Brim Red.png", "APE Brim White.png", "APE Brim Yellow.png", "APE Brim.png", "APE Cap .png", "APE Cap Black.png", "APE Cap Cyan.png", "APE Cap Green.png", "APE Cap Magenta.png", "APE Cap Pink.png", "APE Cap Red.png", "APE Cap Yellow.png", "APE Knit Black.png", "APE Knit Green.png", "APE Knit Magenta.png", "APE Knit Pink.png", "APE Knit Red.png", "APE Knit Yellow.png", "APE Knit.png", "APE Ski 2.png", "APE Ski 3.png", "APE Ski.png", "Afro.png", "Anime.png", "Astro.png", "Beanie.png", "Big Brain.png", "BoHo.png", "Bored APE.png", "Bored Black.png", "Bored Cyan.png", "Bored Gold.png", "Bored Green.png", "Bored Magenta.png", "Bored N Hungry.png", "Bored Pink.png", "Bored Red.png", "Bored.png", "Bowler APE.png", "Bowler Cyan.png", "Bowler Green.png", "Bowler Magenta.png", "Bowler Pink.png", "Bowler Red.png", "Bowler White.png", "Bowler Yellow.png", "Brim APE.png", "Brim Black.png", "Brim Cyan.png", "Brim Green.png", "Brim Magenta.png", "Brim Pink.png", "Brim Red.png", "Brim White.png", "Brim Yellow.png", "Buildoor.png", "Cap APE.png", "Cap Black.png", "Cap Cyan.png", "Cap Green.png", "Cap Magenta.png", "Cap Pink.png", "Cap Red.png", "Cap Yellow.png", "Capt.png", "Commie.png", "Deng Diamond.png", "Deng Gold.png", "Deng.png", "Desperado.png", "DooM.png", "Fisher APE.png", "Fisher Black.png", "Fisher Cyan.png", "Fisher Green.png", "Fisher Magenta.png", "Fisher Pink.png", "Fisher Red.png", "Fisher White.png", "Fisher.png", "FrostByte.png", "GEE.png", "Gimp.png", "Habibi.png", "Halo.png", "Headband APE.png", "Headband Cyan.png", "Headband Green.png", "Headband Magenta.png", "Headband Pink.png", "Headband Red.png", "Headband Yellow.png", "Heisenberg.png", "Hero.png", "Horn.png", "HotHead.png", "Hunter.png", "King APE.png", "King.png", "Knit APE.png", "Knit Cyan.png", "Knit Green.png", "Knit Magenta.png", "Knit Pink.png", "Knit Red.png", "Knit Yellow.png", "Knit.png", "Madusa.png", "Mech.png", "Merica.png", "Miner.png", "Mohawk Cyan.png", "Mohawk Lime.png", "Mohawk Magenta.png", "Party 2.png", "Party 3.png", "Party.png", "Perm.png", "Pharoah.png", "Pirate APE.png", "Pirate Cyan.png", "Pirate Green.png", "Pirate Magenta.png", "Pirate Pink.png", "Pirate Red.png", "Pirate Yellow.png", "Prussian.png", "Rasta.png", "Red Ski 2.png", "Red Ski.png", "RiceHat.png", "Rose.png", "SSJ.png", "Safari.png", "Sailor.png", "Service.png", "Sheriff.png", "Ski.png", "Snap APE.png", "Snap Cyan.png", "Snap Green.png", "Snap Magenta.png", "Snap Pink.png", "Snap Red.png", "Snap White.png", "Snap Yellow.png", "Snap.png", "StrawHat.png", "Stunt.png", "Sweatband APE.png", "Sweatband.png", "UNI.png", "Viking.png", "Welder.png"],
  mouth: ["Banana.png", "Blunt.png", "Bored.png", "Bubble.png", "CYMK Vomit.png", "ChocoNana.png", "Cig.png", "Drool CYMK.png", "Drool.png", "Gold Tooth.png", "Grill CYMK.png", "Grill Diamond.png", "Grill Gold.png", "Grin.png", "Kazoo.png", "Kong.png", "Layer 13 2.png", "Layer 13 3.png", "Layer 13 4.png", "Layer 13 6.png", "Layer 15.png", "Layer 16.png", "Layer 19.png", "Layer 20.png", "Layer 4.png", "Layer 6.png", "Layer 8.png", "Layer 9 2.png", "Layer 9 4.png", "Layer 9.png", "Pipe.png", "Pizza.png", "Sad.png", "Smile.png", "Smirk.png", "StrawNana.png", "Tongue.png", "Vape.png", "Whislte.png"],
};

const layerOrder = ['background', 'fur', 'clothes', 'hat', 'eyes', 'mouth'];

const traitMap = {
  Background: 'background',
  Fur: 'fur',
  Clothes: 'clothes',
  Hat: 'hat',
  Eyes: 'eyes',
  Mouth: 'mouth',
};

export default function LayerEditor({ onExport }) {
  const canvasRef = useRef(null);
  const [selected, setSelected] = useState(
    Object.fromEntries(Object.entries(layers).map(([k, v]) => [k, v[0]]))
  );

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const layer of layerOrder) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = `${baseURL}/${layer}/${selected[layer]}`;
      await new Promise((res) => (img.onload = res));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [selected]);

  const exportPNG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'prime8_composite.png';
    link.href = canvas.toDataURL();
    link.click();
    if (onExport) onExport(selected, canvas.toDataURL());
  };

  const handleImportMetadata = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const imported = { ...selected };
        data.attributes.forEach(attr => {
          const key = traitMap[attr.trait_type];
          if (key && layers[key]?.includes(attr.value)) {
            imported[key] = attr.value;
          }
        });
        setSelected(imported);
      } catch (err) {
        alert('Invalid metadata JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1>Full Body PRIME8 NFT Generator</h1>
      <canvas ref={canvasRef} width={500} height={500} style={{
        borderRadius: 12,
        border: '2px solid #ccc',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }} />

      {layerOrder.map((layer) => (
        <div key={layer} style={{ marginTop: 10 }}>
          <label style={{ marginRight: 10, fontWeight: 'bold', fontSize: '1rem' }}>
            {layer.toUpperCase()}:
          </label>
          <select
            style={{ padding: '0.4rem 0.6rem', fontSize: '1rem', borderRadius: 6, border: '1px solid #ccc' }}
            value={selected[layer]}
            onChange={(e) => setSelected((prev) => ({{ ...prev, [layer]: e.target.value }}))}
          >
            {layers[layer].map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={exportPNG} style={{
        marginTop: 20,
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: 8,
        border: 'none',
        background: '#111827',
        color: 'white',
        cursor: 'pointer'
      }}>
        Export as PNG
      </button>

      <div style={{ marginTop: 20 }}>
        <label>📥 Import Metadata: </label>
        <input type="file" accept=".json" onChange={handleImportMetadata} style={{ marginTop: 8 }} />
      </div>
    </div>
  );
}