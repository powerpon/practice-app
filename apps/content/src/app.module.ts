import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'schema.gql'
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    NotesModule,
  ],
})
export class AppModule {}
