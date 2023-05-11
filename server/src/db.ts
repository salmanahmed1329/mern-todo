import mongoose from 'mongoose';

//------------------------------------------------ DB Connection... ------------------------------------------------//

async function DB_Connect() 
{
  console.log(`DB = ${JSON.stringify(process.env.DATABASE)}`);

  if (process.env.DATABASE)
  {
    await mongoose.connect
    (
      process.env.DATABASE
    )
    .then(() => 
      console.info(`DB_Connect() = DB Connected...`)
    )
    .catch(exception => 
      console.error(`DB_Connect() = ${JSON.stringify(exception)}`)
    );
  }
}

//------------------------------------------------------------------------------------------------//

export { DB_Connect };
