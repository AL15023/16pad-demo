import React , { useState } from "react";
import { motion } from "framer-motion";
import './16pad.css'

//! 自分で音を設定できる4x4のシンセパッドエミュレーション

interface PadProps {
  num: number;
}

// 単体のパッドボタン
const Pad: React.FC<PadProps> = ({num}) => {

  // パッドに内蔵された音色を保存/更新するための状態
  // 初期状態はアセットの音源を読み込む
  const [soundFile, setSoundFile] = useState(`${import.meta.env.BASE_URL}assets/${num}.wav`);

  //! 左クリックで音を鳴らすイベントハンドラー
  const handlePadClick = () => {
    const audio = new Audio(soundFile);
    audio.play().catch((err) => console.log(`sound play error ${err}`));
  };

  //! 右クリックで音を自分でアップロードできるハンドラー
  const handleRightClick = (event: React.MouseEvent) => {
    
    // 既存の右クリックの処理は邪魔なので消す
    event.preventDefault();

    // input要素を作って ->
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "audio/*"; // 音源ファイルのみ対応

    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if(file) {
        setSoundFile(URL.createObjectURL(file));
      }
    }
    // -> 自分でクリックすることでアップロード画面を出す
    fileInput.click();
  };

  return(
    <motion.button
      whileTap={{ scale: 0.9, backgroundColor: "#3b82f6", color: "white" }}
      className="w-24 h-24 border-2 rounded-xl shadow-md border-blue-500 text-blue-500 hover:bg-blue-100"
      onClick={handlePadClick}
      onContextMenu={handleRightClick}
    >
    </motion.button>
  );

};

// Padを収めるフレーム
const PadGrid: React.FC = () => {
  return (
    <div className = "border-4 border-gray-400 p-4 rounded-2x1">
      <div className="grid grid-cols-4 gap-2">
        {
          /* ナンバーを振るために動的に生成 */
          [...Array(16)].map((_, index) => (
            <Pad num={index} />
          ))
        }
      </div>
    </div>
  );
};

// 全体をラップするフレーム
const App = () => (
  <>
    <div className="flex items-center justify-center">
      Click to Play Sound.
      Right click to set sound file.
    </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <PadGrid />
    </div>
</>
);

export default App;
