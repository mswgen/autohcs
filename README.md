# autohcs

이 프로그램은 [건강상태 자가진단](https://hcs.eduro.go.kr)을 자동으로 진행합니다.

## 사용 방법

먼저 GitHub 레포에서 Code(Add file 오른쪽의 초록색 버튼)를 클릭하고 Download ZIP을 클릭해 다운로드한 다음 압축을 풀어주세요.

이 프로그램은 Node.js와 Yarn을 사용합니다.

### Node.js 설치

* Windows: https://nodejs.org/en/download 에서 Windows Installer를 산택해 다운로드, 설치해주세요.

* macOS: https://nodejs.org/en/download 에서 macOS Installer를 산택해 다운로드, 설치해주세요.

* Linux: 각 배포판의 패키지 매니저를 사용해주세요.

### Yarn 설치

* Windows: 관리자 권한으로 Powershell을 열어서 `npm i -g yarn`을 실행해주세요.

* macOS/Linux: 루트 권한으로 터미널에서 `npm i -g yarn`을 실행하거나 루트 유저가 없는 경우(Ubuntu, macOS 등) `sudo npm i -g yarn`을 실행해주세요.

## 설정 방법

[여기](./config.txt)를 참고해주세요.

## 실행하기

압축을 푼 디렉토리에서 터미널(Windows의 경우 Powershell)을 실행해주세요.

다운로드 후 처음 실행하는 경우 `yarn`, `yarn build`를 순서대로 입력해주세요.

macOS, Linux의 경우 터미널에서 `chmod +x run.sh`를 실행해주세요.

실행하려면 Windows의 경우 run.cmd를 더블클릭해 실행해주세요. macOS, Linux의 경우 터미널에서 `./run.sh`를 입력해 실행해주세요.