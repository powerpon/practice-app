import { Injectable } from '@nestjs/common';
import { client } from '@contentstack/management';
import { NoteEntryModel } from 'src/models';
import { Entry } from '@contentstack/management/types/stack/contentType/entry';
import { ContentstackCollection } from '@contentstack/management/types/contentstackCollection';
import { ContentType } from '@contentstack/management/types/stack/contentType';
import { appConfig } from 'src/config';

@Injectable()
export default class NotesRepository {
  private readonly contentstackNotesContentType: ContentType;
  private readonly contentstackLocale: string;
  private readonly contentstackEnvironment: string;

  constructor() {
    this.contentstackNotesContentType = client({
      endpoint: appConfig.contentstackEuEndpoint,
    })
      .stack({
        api_key: appConfig.contentstackStackApiKey,
        management_token: appConfig.contentstackManagementToken,
      })
      .contentType(appConfig.contentstackNotesContentTypeId);
    this.contentstackLocale = appConfig.contentstackPublishLocale;
    this.contentstackEnvironment = appConfig.contentstackPublishEnvironment;
  }

  async queryNoteEntries() {
    return (await this.contentstackNotesContentType
      .entry()
      .query()
      .find()) as unknown as ContentstackCollection<NoteEntryModel>;
  }

  async createNoteEntry(note: NoteEntryModel) {
    return (await this.contentstackNotesContentType
      .entry()
      .create({ entry: note })) as unknown as NoteEntryModel;
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
    return (await this.contentstackNotesContentType
      .entry(id)
      .fetch()) as unknown as NoteEntryModel;
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

  async updateNoteEntry(oldNoteEntry: Entry, newNoteEntry: NoteEntryModel) {
    Object.assign(oldNoteEntry, newNoteEntry);
    return (await oldNoteEntry.update()) as unknown as NoteEntryModel;
  }
}
