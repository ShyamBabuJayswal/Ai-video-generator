import { boolean } from "drizzle-orm/pg-core"; 
import { pgTable, json,serial, varchar } from "drizzle-orm/pg-core";
import { Captions } from "lucide-react";

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    imageUrl: varchar('imageUrl'),
    subscription: boolean('subscription').default(false)
});

export const  VideoData = pgTable('videoData',{
    id:serial('id').primaryKey(),
      script:json('script').notNull(),
      audioFileUrl:varchar('audioFileUrl').notNull(),
      captions:json('captions').notNull(),
      imageList:varchar('imageList').array(),
      createBy:varchar('createBy').notNull()



}
    )
    
