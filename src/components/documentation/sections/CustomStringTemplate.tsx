export const CustomStringTemplate = () => {
  return (
    <div className="flex flex-col">
      {" "}
      <p className="mb-4 text-gray-800">
        <b>{"{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}"}</b>
      </p>
      <p className="mb-4 text-gray-800">
        You might be wondering what the <b>{"{}"}</b> parts are, we call them <i>variables</i>, and the letters inside
        them signify where the components of a song belong to. Let's take this song for example:
      </p>
      <p className="text-gray-800 mb-4">
        <i>Rex Orange County – Pluto Projector</i>
      </p>
      <p className="text-gray-800 mb-4">
        We break down the song into components and place them in their respective parts. <b>{"{a}"}</b> is for the
        'artist' and <b>{"{b}"}</b> is for the 'title'. To use your custom string template, you must provide the song
        followed by a forward slash which is then followed by the string template you want to use. Here's an example:
      </p>
      <p className="text-gray-800 mb-4">
        <b>{"Rex Orange County - Pluto Projector/{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}"}</b>
      </p>
    </div>
  );
};
