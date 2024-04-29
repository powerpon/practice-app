import { Injectable } from '@nestjs/common';
import { client } from '@contentstack/management';
import { NoteModel } from 'src/models';
import { Entry } from '@contentstack/management/types/stack/contentType/entry';

@Injectable()
export default class NotesRepository {
  private readonly contentstackNotesContentType = client({
    endpoint: process.env.CONTENTSTACK_EU_ENDPOINT,
  })
    .stack({
      api_key: process.env.CONTENTSTACK_STACK_API_KEY,
      management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    })
    .contentType(process.env.CONTENTSTACK_NOTES_CONTENT_TYPE_ID);
  private readonly contentstackLocale = process.env.CONTENTSTACK_PUBLISH_LOCALE;
  private readonly contentstackEnvironment =
    process.env.CONTENTSTACK_PUBLISH_ENVIRONMENT;

  async queryNoteEntries() {
    return await this.contentstackNotesContentType.entry().query().find();
  }

  async createNoteEntry(note: NoteModel) {
    return await this.contentstackNotesContentType
      .entry()
      .create({ entry: note });
  }

  async publishNoteEntry(id: string) {
    return await this.contentstackNotesContentType.entry(id).publish({
      publishDetails: {
        locales: [this.contentstackLocale],
        environments: [this.contentstackEnvironment],
      },
    });
  }

  async queryNoteEntry(id: string) {
    return await this.contentstackNotesContentType.entry(id).fetch();
  }

  async unpublishNoteEntry(id: string) {
    return await this.contentstackNotesContentType.entry(id).unpublish({
      publishDetails: {
        locales: [this.contentstackLocale],
        environments: [this.contentstackEnvironment],
      },
    });
  }

  async deleteNoteEntry(id: string) {
    await this.contentstackNotesContentType.entry(id).delete();
  }

  async updateNoteEntry(oldNoteEntry: Entry, newNote: NoteModel) {
    Object.assign(oldNoteEntry, newNote);
    return await oldNoteEntry.update();
  }
}
