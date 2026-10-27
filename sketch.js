// 宣告變數用於儲存精靈圖片與相關屬性
let spriteImg; // 儲存載入的圖片精靈圖檔 (jump.png)
let frameWidth = 729 / 8; // 每張動作禎的寬度 (總寬度 729 像素除以 8 張圖 = 91.125 像素)
let frameHeight = 97; // 每張動作禎的高度 (97 像素)
let totalFrames = 8; // 圖片精靈內的總動作幀數

// 角色狀態與位置變數
let x; // 角色的 X 軸位置
let y; // 角色的 Y 軸位置
let speed = 4; // 角色的移動速度 (每幀移動的像素數)
let currentFrame = 0; // 目前顯示的動作幀索引 (0 到 7)
let animSpeed = 0.2; // 動播播放速度 (數字越大切換動作越快)
let isMoving = false; // 紀錄角色目前是否正在移動
let facingRight = true; // 紀錄角色朝向 (true 表示朝右，false 表示朝左)

// p5.js 預載入函式：在 setup 執行前先載入資源檔
function preload() {
  // 載入位於同目錄下的圖片精靈圖檔 jump.png
  spriteImg = loadImage('jump.png');
}

// p5.js 設定函式：初始化畫布與變數設定
function setup() {
  // 建立全螢幕寬高大小的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定圖片繪製基準點為圖片中心點 (方便進行左右翻轉繪製)
  imageMode(CENTER);
  
  // 初始化角色的位置在畫布正中央
  x = width / 2;
  y = height / 2;
}

// p5.js 主重複繪製函式：預設每秒執行約 60 次
function draw() {
  // 設定畫布背景顏色為 hex 色號 #caf0f8
  background('#caf0f8');
  
  // 呼叫邏輯更新函式，處理按鍵與位置移動
  updatePlayer();
  
  // 呼叫繪製角色函式，將精靈圖像劃出在畫布上
  drawPlayer();
}

// 自訂函式：處理角色的按鍵輸入與位置更新
function updatePlayer() {
  // 預設將移動狀態設定為未移動
  isMoving = false;
  
  // 檢查是否按下了鍵盤的方向右鍵 (RIGHT_ARROW)
  if (keyIsDown(RIGHT_ARROW)) {
    x += speed; // 將 X 軸座標向右增加
    facingRight = true; // 設定面向方向為右側
    isMoving = true; // 標記為正在移動狀態
  } 
  // 檢查是否按下了鍵盤的方向左鍵 (LEFT_ARROW)
  else if (keyIsDown(LEFT_ARROW)) {
    x -= speed; // 將 X 軸座標向左減少
    facingRight = false; // 設定面向方向為左側
    isMoving = true; // 標記為正在移動狀態
  }
  
  // 如果角色正在移動，則持續播放跑動動畫
  if (isMoving) {
    // 依據動畫速度累加當前幀數，並透過取餘數 (%) 讓幀數在 0~7 之間循環
    currentFrame = (currentFrame + animSpeed) % totalFrames;
  } else {
    // 若沒有移動則固定顯示第一張幀 (靜止狀態)
    currentFrame = 0;
  }
}

// 自訂函式：繪製角色精靈
function drawPlayer() {
  // 算當前動作幀在圖片精靈中的整數索引 (無條件捨去小數點)
  let frameIndex = floor(currentFrame);
  
  // 計算要裁切的子圖檔在原始精靈圖檔中的 X 軸起始位置
  let sx = frameIndex * frameWidth;
  
  // 儲存目前的繪製狀態矩陣設定
  push();
  
  // 將座標系原點移動到角色的當前座標 (x, y)
  translate(x, y);
  
  // 根據角色的面向方向進行水平翻轉
  if (!facingRight) {
    // 若面向左側，將 X 軸向進行 -1 倍縮放以達水平翻轉效果
    scale(-1, 1);
  }
  
  // 繪製裁切後的精靈圖片：
  // 參數說明：image(圖檔, 畫布X, 畫布Y, 顯示寬, 顯示高, 原圖裁切X, 原圖裁切Y, 裁切寬, 裁切高)
  image(
    spriteImg, 
    0, 0, 
    frameWidth, frameHeight, 
    sx, 0, 
    frameWidth, frameHeight
  );
  
  // 還原先前儲存的繪製狀態矩陣，避免影響後續其他圖形的繪製
  pop();
}

// 當瀏覽器視窗大小改變時自動觸發此函式
function windowResized() {
  // 將畫布大小重新調整為目前視窗的全螢幕寬高
  resizeCanvas(windowWidth, windowHeight);
}