document.addEventListener("DOMContentLoaded", async function()
{
    try
    {
        const response = await fetch("/szobak");

        if (!response.ok)
        {
            throw new Error(`Hibakód: ${response.status}`);
        }
  
        const json = await response.json();

        for (let i = 0; i < 7; i++)
        {
            document.body.innerHTML +=
            `
                <div id="szoba">
                    <h1>${json[i].sznev}</h1>
                    <p>Ágyak: ${json[i].agy}</p>
                    <p>Pótágyak: ${json[i].potagy}</p>
                </div>
                <br>
            `;
        }

        console.log(json);
    }
    catch (error)
    {
        console.error(error.message);
    }
});