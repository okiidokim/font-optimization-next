export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 p-16">
      <header className="row-start-1 flex gap-[24px] flex-wrap items-center justify-center">
        <span>헤더입니다.</span>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-start">
        <h1 className="font-bold text-[2rem]">
          Next.js에서 폰트 최적화 시험하기
        </h1>
        <div>
          <h3>
            FOIT<span>&nbsp;(Flash Of Invisible Text)</span>
          </h3>
          <div>실제 폰트가 로드되기 전까지 보이지 않음</div>
        </div>
        <div>
          <h3>
            FOUT<span>&nbsp;(Flash Of Unstyled Text)</span>
          </h3>
          <div>
            실제 폰트가 로드되기 전까지 시스템 폰트/fallback 폰트를 보인 후 실제
            폰트로 변경함
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span>푸터입니다.</span>
      </footer>
    </div>
  );
}
