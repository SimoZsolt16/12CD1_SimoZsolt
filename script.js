document.addEventListener("DOMContentLoaded", async function()
{
    try
    {
        const response = await fetch("/szobak-osszes");

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
    }
    catch (error)
    {
        console.error(error.message);
    }
});

async function Kereses()
{
    try
    {
        const nev = document.getElementById("nev").value;
        const agyak = document.getElementById("agyak").value;
        const potagyak = document.getElementById("potagyak").value;

        const response = await fetch(`/szobak/${nev}/${agyak}/${potagyak}`);

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
    }
    catch (error)
    {
        console.error(error);
    }
};