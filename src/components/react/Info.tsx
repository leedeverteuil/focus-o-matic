import { Github } from "react-bootstrap-icons";

function Info() {
  return (
    <aside className="absolute w-[300px] bottom-5 left-5 text-sm text-zinc-600 flex flex-col gap-2.5 hover:text-zinc-400 transition-colors">
      <p>
        Built to help you focus. Use our presets or fine-tune your own sound.
      </p>
      <a
        href="https://github.com/leedeverteuil"
        target="_blank"
        className="hover:underline">
        Made by Lee de Verteuil.
      </a>

      {/* socials */}
      <div>
        <a
          href="https://github.com/leedeverteuil/focus-sounds"
          target="_blank"
          className="flex items-center justify-start gap-2 hover:underline">
          <Github></Github>
          Source code
        </a>
      </div>
    </aside>
  );
}

export default Info;
