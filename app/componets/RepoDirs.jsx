import React from 'react'
import Link from 'next/link'

async function fetchRepoContents(name) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(`https://api.github.com/repos/Onyedikachi123/${name}/contents`, 
    {
        // this is to check how long to check for fresh data
        next: {
          revalidate: 60,
        },
      }
    );
    const contents = await response.json();

    return contents;
}

const RepoDirs = async ({ name }) => {
    try {
      const contents = await fetchRepoContents(name);
  
      // Ensure that contents is an array before using filter()
      if (!Array.isArray(contents)) {
        throw new Error("fetchRepoContents did not return an array.");
      }
  
      const dirs = contents.filter((content) => content.type === 'dir');
  
      return (
        <>
          <h3>Directories</h3> 
          <ul>
            {dirs.map((dir) => (
              <li key={dir.path}>
                <Link href={`/code/repos/${name}/${dir.path}`}>
                  {dir.path}
                </Link>
              </li>
            ))}
          </ul>
        </>
      );
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error occurred:", error.message);
      return null; // or some error component
    }
  };
  

// const RepoDirs = async ({ name }) => {
//     const contents = await fetchRepoContents(name);
//     console.log(contents);
//     const dirs = contents.filter((content) => content.type === 'dir');


//   return (
//     <>
//        <h3>Directories</h3> 
//        <ul>
//         {dirs.map((dir) => (
//             <li key={dir.path}>
//                 <Link href={`/code/repos/${name}/${dir.path}`}>
//                  {dir.path}
//                 </Link>
//             </li>
//         ))}
//        </ul>
//     </>
//   )
// }

export default RepoDirs