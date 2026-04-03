import type { CreateDocument } from "@skeleton/shared";

import * as repo from "./repository.js";

export function getVisitors() {
  return repo.getVisitors();
}

export function getSummaryCards() {
  return repo.getSummaryCards();
}

export function getDocuments(userId: string) {
  return repo.getDocuments(userId);
}

export function createDocument(userId: string, data: CreateDocument) {
  return repo.createDocument(userId, data);
}

export function deleteDocument(userId: string, id: number) {
  return repo.deleteDocument(userId, id);
}
