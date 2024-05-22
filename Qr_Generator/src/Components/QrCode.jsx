import { useState } from "react";

const QrCode = () => {
    const [img,setImg]=useState("");
    const [loading, setLoading]=useState(false);
    const [qrData,setQrData]=useState("https://veeru-portfolio.vercel.app/");
    const [qrSize,setSize]=useState("200");

    //API taking time to load so use async
    async function generateQR(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }
        catch(error){
            console.error("Error generating QR code",error);
        } finally{
            setLoading(false);
        }
    }

    function downloadQR(){
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error("Error downloading QR code", error);
        });
    }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please Wait..</p>}
        {img && <img src={img} className="qr-code-image" alt="Qr-code" />}
      <div className="input-field">
          <label htmlFor="dataInput" className="input-label">
            Data for QR code:
          </label>
          <input id="dataInput" type="text" placeholder="Enter data for Qr code" value={qrData} onChange={(e)=>setQrData(e.target.value)} />
          <label htmlFor="SizeInput" className="input-label">
            Image size (e.g., 150):
          </label>
          <input id="SizeInput" type="text" placeholder="Enter image size" value={qrSize} onChange={(e)=>setSize(e.target.value)}/>
            <div>
                <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
                <button className="download-button" onClick={downloadQR}>Download QR Code</button>
            </div>
      </div>
      <p className="footer">Designed by <a href="https://veeru-portfolio.vercel.app/">Veeramani</a></p>
    </div>
  );
};

export default QrCode;
